//GET ARTICLES

//Post Methods
// Add a dropdown field for sections on the article page.

const fetch = require('node-fetch');
function insertArticleIntoDatabase(params) {

	fetch('http://localhost:9999/learn/article', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params),
	}).then((response => {
		if (response.ok) {
			console.log("Successfully inserted");
		} else {
			console.log("Unable to insert");
		}
	}));
}

function insertOpportunityIntoDatabase(params) {
	console.log(params.type);
	fetch('http://localhost:9999/opportunities', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params), 
	}).then((response => {
		if (response.ok) {
			console.log("Successfully inserted Opportunity : ");
		} else {
			console.log("Unable to insert Opportunity");
		}
	}));
}

function insertSectionIntoDatabase(params) {
	console.log(params.section);
	fetch('http://localhost:9999/section', {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json',
			body: JSON.stringify(params),
		}
	}).then((response) => {
		if (response.ok) {
			console.log("Successfully inserted Opportunity");
		} else {
			console.log("Unable to insert opportunity");
		}
	});
}

const sampleSections = [
			{section: "How to Smoke"},
			{section: "Decriminalization"},
			{section: "History"},
			{section: "Medicinal Uses"},
			{section: "Recipes"},
		];
const sampleOpportunities =  [
			{
			title: "Opportunity Name",
			type: 'How To Smoke',
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
		},
			{
			title: "Opportunity Name",
			type: 'How To Smoke',
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
		},
			{
			title: "Opportunity Name",
			type: 'How To Smoke',
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
		},
			{
			title: "Opportunity Name",
			type: 'How To Smoke',
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
		},
		];

const sampleArticles = [
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'Newest article',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: '',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: '',
				section: 'How To Smoke'
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'Article on SMART',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: '',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: '',
				section: 'How To Smoke'
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'External Article',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: 'https://www.example.com/external-link',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
				section: 'How To Smoke',
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale IV',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: 'https://www.example.com/external-link',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
				section: 'How To Smoke',
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale V',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: 'https://www.example.com/external-link',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
				section: 'How To Smoke',
			},
			{
				id: '420',
				image: '/asset/article-abc.jpg',
				title: 'How to properly inhale VI',
				author: 'Rotomoto',
				date: '4/20/2018',
				url: 'https://www.example.com/external-link',
				summary: 'I started painting as a hobby when I was little. I didn\'t know I had any talent. I believe talent is just a pursued interest. Anybody can do what I do. This painting comes right out of your heart.',
				source: 'PR0HBTD',
				section: 'How To Smoke',
			},
		];


sampleSections.map(insertSectionIntoDatabase);
sampleArticles.map(insertArticleIntoDatabase);
sampleOpportunities.map(insertOpportunityIntoDatabase);