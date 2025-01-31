type Position = {
	title: string;
	employer: string;
	description: string;
};

const positions: Array<Position> = [
	{
		title: 'Fast Food Cook',
		employer: 'Dairy Queen',
		description:
			'My first job was working part time at Dairy Queen in the back, which was known as the grill. I prepared all the hot food at that location. My responsibilities included managing a grill, multiple fryers, multiple microwaves, two ovens, and the freezer. I always worked the closing shift, so at the end of the night, I would do all the dishes, clean the grill and the fryers, take the grease out back behind the dumpster and pour it into the receptacal, clean all surfaces including the insides of the microwaves, take out the trash, and finally mop the floors.'
	},
	{
		title: 'Deli Associate',
		employer: 'Dierbergs Markets',
		description:
			"My second job was working full time at Dierberg's in the Deli department. This job was much the same as working at Dairy Queen. Both jobs had lots of hard work preparing food, cleaning, and working the closing shift. The difference with Dierberg's was that I was now working full time while still attending school, and in a position where I had to both provide customer service, and functionally work as a team with my co-workers, which was in stark contrast to the solitude of Dairy Queen. During my time at Dierberg's, I was also in charge of training new part-time hires."
	},
	{
		title: 'Computer Technician',
		employer: 'Dimension Computer',
		description:
			'I repaired computers through both hardware and software complications.'
	}
];

export default positions;
