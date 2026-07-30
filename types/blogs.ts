export interface blogparams{
 title:string
 slug:string
 content:string
 featured_image:string
 date:string
 category_id:number
 status:string
}

import { BranchBlog } from "@/types";

export const blogPosts: BranchBlog[] = [
  {
    id: "international-expansion",
    title: "Bajeko Sekuwa Expands to the USA",
    excerpt: "We are thrilled to announce our new outlets in New York and Dallas, bringing authentic Himalayan flavors to the United States.",
    content: "Full content about international expansion...",
    image: "/images/banner.jpg",
    date: "2023-10-15",
    isGlobal: true,
    category:"global",
  },
  {
    id: "new-menu-launch",
    title: "Introducing Our New Thakali Thali Menu",
    excerpt: "Experience the authentic taste of Mustang with our newly launched Thakali Thali, now available at all outlets.",
    content: "Full content about new menu launch...",
    image: "/images/img8.png",
    date: "2024-02-20",
    isGlobal: true,
    category:"global",

  },
  {
    id: "company-news-award",
    title: "Bajeko Sekuwa Wins Best Franchise Award",
    excerpt: "Thank you for your continuous support. We have been awarded the Best Franchise Brand of the Year.",
    content: "Full content about the award...",
    image: "/images/img5.jpeg",
    date: "2024-05-10",
    isGlobal: true,
        category:"global",

  },
    {
      id: "battisputali-live-music",
      title: "Live Music Fridays at Battisputali",
      excerpt: "Join us every Friday evening for live music, charcoal sekuwa, and chilled beverages at our flagship outlet.",
      content: "Full content about live music...",
      image: "/images/img4.jpeg",
      date: "2024-07-01",
      isGlobal: false,
      category:""
    },
  
 
    {
      id: "ny-dashain-offer",
      title: "Special Dashain Buffet Offer",
      excerpt: "Celebrate Dashain with your family at Bajeko Sekuwa New York. Enjoy our special festive buffet this weekend.",
      content: "Full content about Dashain offer...",
      image: "/images/img7.png",
      date: "2024-09-15",
      isGlobal: false,
      category:""

    },
    {
      id: "pokhara-anniversary",
      title: "Celebrating 5 Years in Pokhara",
      excerpt: "We are turning 5! Join our Lakeside anniversary celebration for exclusive discounts.",
      content: "Full content about the anniversary...",
      image: "/images/img3.png",
      date: "2024-08-12",
      isGlobal: false,
      category:""
    }
  ]
