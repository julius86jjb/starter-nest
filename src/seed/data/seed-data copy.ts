interface SeedDepartment {
    name: string
    titles: string[]
    slug: string
    img: string
    icon: string
    views: number
    categories: Category[]
}

interface Category {
    name: string
    department_title: string
}

interface SeedData {
    departments: SeedDepartment[];
}


export const initialData: SeedData = {
    departments: [
        {
            name: "Consumer Electric",
            titles: [
                "Electronic",
                "Accessories and Parts"
            ],
            slug: "consumer-electric",
            img: "comsumer-electric.jpg",
            icon: "icon-laundry",
            views: 2,
            categories: [
                {
                    name: "Home Audio and Theathers",
                    department_title: "Electronic"
                },
                {
                    name: "TV and Videos",
                    department_title: "Electronic"
                },
                {
                    name: "Camera, Photos and Videos",
                    department_title: "Electronic"
                },
                {
                    name: "Cellphones and Accessories",
                    department_title: "Electronic"
                },
                {
                    name: "Headphones",
                    department_title: "Electronic"
                },
                {
                    name: "Video games",
                    department_title: "Electronic"
                },
                {
                    name: "Wireless Speakers",
                    department_title: "Electronic"
                },
                {
                    name: "Office Electronic",
                    department_title: "Electronic"
                },
                {
                    name: "Digital Cables",
                    department_title: "Accessories and Parts"
                },
                {
                    name: "Audio and Video Cables",
                    department_title: "Accessories and Parts"
                },
                {
                    name: "Batteries",
                    department_title: "Accessories and Parts"
                }
            ]
        },
        {
            name: "Clothing and Apparel",
            titles: [
                "Mens",
                "Womens",
                "Kids"
            ],
            slug: "clothing-apparel",
            img: "clothing-apparel.jpg",
            icon: "icon-shirt",
            views: 4,
            categories: [
                {
                    name: "Sportswear man",
                    department_title: "Mens"
                },
                {
                    name: "Elegant clothes man",
                    department_title: "Mens"
                },
                {
                    name: "Classic clothes man",
                    department_title: "Mens"
                },
                {
                    name: "Sportswear woman",
                    department_title: "Womens"
                },
                {
                    name: "Elegant clothes woman",
                    department_title: "Womens"
                },
                {
                    name: "Classic clothes woman",
                    department_title: "Womens"
                },
                {
                    name: "Sportswear kids",
                    department_title: "Kids"
                },
                {
                    name: "Elegant clothes kids",
                    department_title: "Kids"
                },
                {
                    name: "Classic clothes kids",
                    department_title: "Kids"
                }
            ]
        },
        {
            name: "Home, Garden and Kitchen",
            titles: [
                "Home",
                "Garden",
                "Kitchen"
            ],
            slug: "home-kitchen",
            img: "home-kitchen.jpg",
            icon: "icon-lampshade",
            views: 5,
            categories: [
                {
                    name: "Cookware",
                    department_title: "Home"
                },
                {
                    name: "Decoration",
                    department_title: "Home"
                },
                {
                    name: "Furniture",
                    department_title: "Home"
                },
                {
                    name: "Garden Tools",
                    department_title: "Garden"
                },
                {
                    name: "Garden Equipments",
                    department_title: "Garden"
                },
                {
                    name: "Powers and Hand Tools",
                    department_title: "Garden"
                },
                {
                    name: "Utensil and Gadget",
                    department_title: "Garden"
                },
                {
                    name: "Kitchen Equipments",
                    department_title: "Kitchen"
                },
                {
                    name: "Kitchen Utensil",
                    department_title: "Kitchen"
                }
            ]
        },
        {
            name: "Health and Beauty",
            titles: [
                "Health",
                "Beauty"
            ],
            slug: "health-beauty",
            img: "health-beauty.jpg",
            icon: "icon-heart-pulse",
            views: 23,
            categories: [
                {
                    name: "Yoga Instrument",
                    department_title: "Health"
                },
                {
                    name: "Passive Gymnastics",
                    department_title: "Health"
                },
                {
                    name: "Gym Equipment",
                    department_title: "Health"
                },
                {
                    name: "Hair Care",
                    department_title: "Beauty"
                },
                {
                    name: "Makeup",
                    department_title: "Beauty"
                },
                {
                    name: "Perfume",
                    department_title: "Beauty"
                }
            ]
        },
        {
            name: "Jewelry and Watches",
            titles: [
                "Jewelry",
                "Watches"
            ],
            slug: "jewelry-watches",
            img: "jewelry-watches.jpg",
            icon: "icon-diamond2",
            views: 3,
            categories: [
                {
                    name: "Necklace",
                    department_title: "Jewelry"
                },
                {
                    name: "Pendant",
                    department_title: "Jewelry"
                },
                {
                    name: "Ring",
                    department_title: "Jewelry"
                },
                {
                    name: "Sport Watch",
                    department_title: "Watches"
                },
                {
                    name: "Womens Watch",
                    department_title: "Watches"
                },
                {
                    name: "Mens Watch",
                    department_title: "Watches"
                }
            ]
        },
        {
            name: "Computer and Technology",
            titles: [
                "Computer",
                "Technology"
            ],
            slug: "computer-technology",
            img: "computer-technology.jpg",
            icon: "icon-desktop",
            views: 45,
            categories: [
                {
                    name: "Smartphones",
                    department_title: "Technology"
                },
                {
                    name: "Tablets",
                    department_title: "Technology"
                },
                {
                    name: "Wireless Speaker",
                    department_title: "Technology"
                },
                {
                    name: "Desktop PC",
                    department_title: "Computer"
                },
                {
                    name: "Laptop",
                    department_title: "Computer"
                },
                {
                    name: "Audio and Video",
                    department_title: "Computer"
                }
            ]
        }
    ]
}