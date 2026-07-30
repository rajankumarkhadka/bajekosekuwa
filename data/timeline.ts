export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    details: string;
    location: string;
    image: string;
}

export const timelineEvents: TimelineEvent[] = [
    {
        year: "1976",
        title: "The Charcoal Beginnings",
        description: "Late Mr. Dinanath Bhandari sets up a tiny charcoal-grill stall near Kathmandu Airport. Loved by locals, he is affectionately nicknamed 'Baje' (Grandpa).",
        details: "Armed with a secret blend of Himalayan spices and high-quality mutton, the legendary sekuwa recipe is born.",
        location: "Kathmandu, Nepal",
        image: "/images/bajelogo.jpg"
    },
    {
        year: "1996",
        title: "Sinamangal Flagship",
        description: "Ignited by Baje's passion, his son Mr. Chetan Bhandari takes the helm and establishes the first stable restaurant at Sinamangal Junction.",
        details: "This marks the transition from a street stall to a structured family restaurant, laying the foundation for a national franchise.",
        location: "Kathmandu, Nepal",
        image: "/images/bajelogo.jpg"
    },
    {
        year: "2007",
        title: "Spiceworld & Sister Concerns",
        description: "Standardizing the unique flavors that made the brand famous, the Bhandari family launches sister concerns like Bajeko Masala.",
        details: "Under the leadership of Mrs. Nitima Karki Bhandari, this step ensures that authentic spices are produced with absolute consistency.",
        location: "Kathmandu, Nepal",
        image: "/images/bajelogo.jpg"
    },
    {
        year: "2018",
        title: "International Frontiers",
        description: "The brand crosses national borders, taking authentic Nepali and Himalayan sekuwa to global cities.",
        details: "Expansion begins with key partnerships in the USA, Australia, and the Middle East, spreading Nepalese hospitality ('Atithi Devo Bhava') internationally.",
        location: "International Expansion",
        image: "/images/bajelogo.jpg"
    },
    {
        year: "Present",
        title: "Worldwide Culinary Presence",
        description: "With multiple international outlets in New York, Dallas, Colorado, Sydney, Melbourne, and Dubai, Bajeko Sekuwa is the premium ambassador of Nepalese cuisine.",
        details: "Integrating traditional charcoal roasting with modern culinary arts under a unified, global franchise system.",
        location: "Worldwide",
        image: "/images/bajelogo.jpg"
    }
];
