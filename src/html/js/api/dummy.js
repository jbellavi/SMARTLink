class DummyAPI {
	/**
	 * Gets the saved response for getOpportunity.
	 */
	getOpportunityRes() {
		return {
			title: "Opportunity Name",
			organization: "Organization name",
			compensation: "full-time, paid",
			location: "Providence, RI",
			deadline: "4/20/18",
			description: "Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned. Everything's not great in life, but we can still find beauty in it. From all of us here, I want to wish you happy painting and God bless, my friends. Just relax and let it flow. That easy. I like to beat the brush. Let's put a touch more of the magic here. Let your heart be your guide. Even the worst thing we can do here is good. There comes a nice little fluffer. This is an example of what you can do with just a few things, a little imagination and a happy dream in your heart.",
			qualifications: "Everyone wants to enjoy the good parts - but you have to build the framework first. If you don't think every day is a good day - try missing a few. You'll see. Let the paint work. A fan brush is a fantastic piece of equipment. Use it. Make friends with it. It's cold, but it's beautiful. Just go out and talk to a tree. Make friends with it. That's why I paint - because I can create the kind of world I want - and I can make this world as happy as I want it. I can't think of anything more rewarding than being able to express yourself to others through painting.",
			commitment: "Exercising the imagination, experimenting with talents, being creative; these things, to me, are truly the windows to your soul. We want to use a lot pressure while using no pressure at all. Let's build an almighty mountain. These things happen automatically. All you have to do is just let them happen.",
			howToApply: "Let's do it again then, what the heck. Let your heart take you to wherever you want to be. This is truly an almighty mountain. Use your imagination, let it go.",
			about: "Just use the old one inch brush. This is an example of what you can do with just a few things, a little imagination and a happy dream in your heart. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself. You got your heavy coat out yet? It's getting colder. We'll paint one happy little tree right here.",
			link: "https://www.example.com/external-link",
		};
	}

	/**
	 * Gets the saved response for getOpportunity.
	 */
	getOpportunitiesRes() {
		return [
			{
				title: "Opportunity Name",
				organization: "Organization name",
				compensation: "full-time, paid",
				location: "Providence, RI",
				deadline: "4/20/2018",
				id: '420',
				link: "https://www.example.com/external-link",
			},
			{
				title: "Another Opportunity",
				organization: "Organization name",
				compensation: "full-time, paid",
				location: "Providence, RI",
				deadline: "4/20/2018",
				id: '420',
				link: "https://www.example.com/external-link",
			},
			{
				title: "Yet Another Opportunity",
				organization: "Organization name",
				compensation: "full-time, paid",
				location: "Providence, RI",
				deadline: "4/20/2018",
				id: '420',
				link: "https://www.example.com/external-link",
			},
		];
	}

	/**
	 * Gets the saved respones for getArticle
	 */
	getArticleRes() {
		return {
			id: '420',
			title: 'How to properly inhale',
			image: '/asset/article-abc.jpg',
			author: 'Rotomoto',
			date: '4/20/2018',
			content: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart. That\'s why I paint - because I can create the kind of world I want - and I can make this world as happy as I want it. I want everbody to be happy. That\'s what it\'s all about. How do you make a round circle with a square knife? That\'s your challenge for the day. Let\'s have a nice tree right here.\nJust let your mind wander and enjoy. This should make you happy. See there how easy that is. That\'s a crooked tree. We\'ll send him to Washington. Let\'s put some happy little clouds in our world.\nEven the worst thing we can do here is good. Use what happens naturally, don\'t fight it. This is truly an almighty mountain. That\'s crazy. I spend a lot of time walking around in the woods and talking to trees, and squirrels, and little rabbits and stuff.\nAll kinds of happy little splashes. This is a happy place, little squirrels live here and play. We\'ll play with clouds today. Let\'s put some happy trees and bushes back in here. Use your imagination, let it go. The only prerequisite is that it makes you happy. If it makes you happy then it\'s good.\nYou can work and carry-on and put lots of little happy things in here. Volunteering your time; it pays you and your whole community fantastic dividends. Let your imagination be your guide.\nI sincerely wish for you every possible joy life could bring. In your world you have total and absolute power. With something so strong, a little bit can go a long way. Look around, look at what we have. Beauty is everywhere, you only have to look to see it. You have to make these big decisions. Everybody\'s different. Trees are different. Let them all be individuals.\nI thought today we would do a happy little picture. Poor old tree. Now we can begin working on lots of happy little things. It\'s life. It\'s interesting. It\'s fun.\n',
			source: 'PR0HBTD',
		};
	}

	/**
	 * Gets the saved respones for getArticle
	 */
	getArticlesRes() {
		return [
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale',
				author: 'Rotomoto',
				date: '4/20/2018',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale II',
				author: 'Rotomoto',
				date: '4/20/2018',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale III',
				author: 'Rotomoto',
				date: '4/20/2018',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
			},
		];
	}

	/**
	 * Calls the callback with the given data after a short delay.
	 *
	 * @param callback  the callback function
	 * @param data      the data to pass
	 */
	success(callback, data) {
		setTimeout(() => callback(data), 1500);
	}
}
