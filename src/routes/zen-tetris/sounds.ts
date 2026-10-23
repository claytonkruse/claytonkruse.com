// Soft synthesized sounds, built with the Web Audio API so there are no audio files to load.
// Every note comes from the A minor pentatonic scale, so anything that overlaps stays calm,
// and everything rings out into a long, gentle reverb.

// Semitones above A of each note in the scale: A, C, D, E, G.
const SCALE = [0, 3, 5, 7, 10];

let audio: AudioContext | null = null;
let dry: GainNode;
let wet: GainNode;
let enabled = true;
// How many scale steps the line clear plucks have drifted from where they started. It takes a
// small random step every clear, so a run of clears plays a wandering melody instead of the
// same notes over and over.
let wander = 0;

// The frequency of the nth note of the scale, counting up from A2.
function note(n: number): number {
	const octave = Math.floor(n / SCALE.length);
	const semitones = 12 * octave + SCALE[((n % SCALE.length) + SCALE.length) % SCALE.length];
	return 110 * 2 ** (semitones / 12);
}

// A few seconds of decaying noise makes a smooth, roomy reverb.
function impulse(ctx: AudioContext, seconds: number): AudioBuffer {
	const buffer = ctx.createBuffer(2, ctx.sampleRate * seconds, ctx.sampleRate);
	for (let channel = 0; channel < 2; channel++) {
		const data = buffer.getChannelData(channel);
		for (let i = 0; i < data.length; i++)
			data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 3;
	}
	return buffer;
}

function context(): AudioContext | null {
	if (!enabled || typeof AudioContext === 'undefined') return null;
	if (!audio) {
		audio = new AudioContext();
		const master = audio.createGain();
		master.gain.value = 0.6;
		// Round off any harsh edges.
		const soften = audio.createBiquadFilter();
		soften.type = 'lowpass';
		soften.frequency.value = 3500;
		soften.connect(master).connect(audio.destination);
		dry = audio.createGain();
		dry.connect(soften);
		const reverb = audio.createConvolver();
		reverb.buffer = impulse(audio, 3);
		reverb.connect(soften);
		wet = audio.createGain();
		wet.gain.value = 0.5;
		wet.connect(reverb);
	}
	return audio;
}

// Browsers keep audio silent until the page is interacted with, so call this from input handlers.
export function wake() {
	const ctx = context();
	if (ctx?.state === 'suspended') ctx.resume();
}

export function setEnabled(on: boolean) {
	enabled = on;
	if (on) audio?.resume();
	else audio?.suspend();
}

function tone(
	frequency: number,
	{
		delay = 0,
		duration = 1,
		volume = 0.1,
		attack = 0.01,
		type = 'sine' as OscillatorType,
		glide = 1
	} = {}
) {
	const ctx = context();
	if (!ctx || ctx.state !== 'running') return;
	const start = ctx.currentTime + delay;
	const osc = ctx.createOscillator();
	osc.type = type;
	osc.frequency.setValueAtTime(frequency, start);
	if (glide !== 1) osc.frequency.exponentialRampToValueAtTime(frequency * glide, start + duration);
	const gain = ctx.createGain();
	gain.gain.setValueAtTime(0, start);
	gain.gain.linearRampToValueAtTime(volume, start + attack);
	gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
	osc.connect(gain);
	gain.connect(dry);
	gain.connect(wet);
	osc.start(start);
	osc.stop(start + duration + 0.05);
}

// A kalimba-like pluck: a short, woody tone with a faint metallic tine on top that dies away
// almost instantly. Its overtone sits at an inharmonic 5.4x, like a real tine.
function pluck(frequency: number, delay: number, volume: number) {
	tone(frequency, { delay, duration: 0.7, volume, attack: 0.003, type: 'triangle' });
	tone(frequency * 2, { delay, duration: 0.25, volume: volume * 0.3, attack: 0.003 });
	tone(frequency * 5.4, { delay, duration: 0.08, volume: volume * 0.1, attack: 0.002 });
}

export function move() {
	tone(note(17), { duration: 0.08, volume: 0.0067 });
}

export function rotate() {
	tone(note(19), { duration: 0.15, volume: 0.0087, attack: 0.005 });
}

// A warm, low note whose pitch follows the column the piece settled in, so play has a melody.
export function lock(column: number) {
	tone(note(5 + Math.round(column / 2)), { duration: 0.9, volume: 0.07, type: 'triangle' });
}

export function hardDrop() {
	tone(note(0), { duration: 0.35, volume: 0.12, glide: 0.5 });
}

// A soft rush of air: noise through a lowpass filter that sweeps down, so it starts as a hush
// and settles into a low rumble without any hiss.
function whoosh(volume: number, duration: number) {
	const ctx = context();
	if (!ctx || ctx.state !== 'running') return;
	const start = ctx.currentTime;
	const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	const source = ctx.createBufferSource();
	source.buffer = buffer;
	const filter = ctx.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.setValueAtTime(1800, start);
	filter.frequency.exponentialRampToValueAtTime(200, start + duration);
	const gain = ctx.createGain();
	gain.gain.setValueAtTime(0, start);
	gain.gain.linearRampToValueAtTime(volume, start + 0.02);
	gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
	source.connect(filter).connect(gain);
	gain.connect(dry);
	gain.connect(wet);
	source.start(start);
}

// A deep, rounded thump and a soft rush of air, with more weight for more lines, under a quick
// rising run of kalimba plucks, one more and a bit louder for each line cleared, starting higher the
// longer the combo and wandering a little each time.
// A tetris adds a deep, slow-swelling chord.
export function clear(lines: number, combo: number) {
	const weight = 0.6 + 0.1 * lines;
	tone(note(0), { duration: 0.8, volume: 0.26 * weight, attack: 0.008, glide: 0.5 });
	tone(note(5), { duration: 0.5, volume: 0.1 * weight, attack: 0.008, glide: 0.5 });
	whoosh(0.1 * weight, 0.6);

	// Step somewhere new every time, turning back at the edges of the range.
	const step = [-2, -1, 1, 2][Math.floor(Math.random() * 4)];
	wander += Math.abs(wander + step) > 3 ? -step : step;
	const first = 10 + wander + Math.min(combo, 5);
	const count = lines === 4 ? 6 : lines + 1;
	// A little looseness in timing and touch, like a person playing.
	for (let i = 0; i < count; i++)
		pluck(
			note(first + i),
			i * 0.09 + Math.random() * 0.02,
			0.015 * lines * (0.85 + Math.random() * 0.3)
		);

	if (lines === 4)
		for (const n of [0, 2, 4])
			tone(note(n + 5), { duration: 3, volume: 0.05, attack: 0.4, type: 'triangle' });
}
