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
    department_title: string,
    img: string,
    inventory: number,
    views: number
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
                    department_title: "Electronic",
                    img: "home-audio-theathers.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "TV and Videos",
                    department_title: "Electronic",
                    img: "tv-videos.jpg",
                    inventory: 10,
                    views: 4
                },
                {
                    name: "Camera, Photos and Videos",
                    department_title: "Electronic",
                    img: "camera-photos-videos.jpg",
                    inventory: 10,
                    views: 5
                },
                {
                    name: "Cellphones and Accessories",
                    department_title: "Electronic",
                    img: "cellphones-accessories.jpg",
                    inventory: 10,
                    views: 23
                },
                {
                    name: "Headphones",
                    department_title: "Electronic",
                    img: "headphones.jpg",
                    inventory: 10,
                    views: 3
                },
                {
                    name: "Video games",
                    department_title: "Electronic",
                    img: "video-games.jpg",
                    inventory: 10,
                    views: 45
                },
                {
                    name: "Wireless Speakers",
                    department_title: "Electronic",
                    img: "wireless-speakers.jpg",
                    inventory: 10,
                    views: 4

                },
                {
                    name: "Office Electronic",
                    department_title: "Electronic",
                    img: "office-electronic.jpg",
                    inventory: 10,
                    views: 45
                },
                {
                    name: "Digital Cables",
                    department_title: "Accessories and Parts",
                    img: "digital-cables.jpg",
                    inventory: 10,
                    views: 5
                },
                {
                    name: "Audio and Video Cables",
                    department_title: "Accessories and Parts",
                    img: "audio-video-cables,jpg",
                    inventory: 10,
                    views: 5
                },
                {
                    name: "Batteries",
                    department_title: "Accessories and Parts",
                    img: "batteries.jpg",
                    inventory: 10,
                    views: 4
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
                    department_title: "Mens",
                    img: "sportswear-man.jpg",
                    inventory: 10,
                    views: 4
                },
                {
                    name: "Elegant clothes man",
                    department_title: "Mens",
                    img: "elegant-clothes-man.jpg",
                    inventory: 10,
                    views: 12
                },
                {
                    name: "Classic clothes man",
                    department_title: "Mens",
                    img: "classic-clothes-man.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Sportswear woman",
                    department_title: "Womens",
                    img: "sportswear-woman.jpg",
                    inventory: 10,
                    views: 21
                },
                {
                    name: "Elegant clothes woman",
                    department_title: "Womens",
                    img: "elegant-clothes-woman.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Classic clothes woman",
                    department_title: "Womens",
                    img: "classic-clothes-woman.jpg",
                    inventory: 10,
                    views: 12
                },
                {
                    name: "Sportswear kids",
                    department_title: "Kids",
                    img: "sportswear-kids.jpg",
                    inventory: 10,
                    views: 21
                },
                {
                    name: "Elegant clothes kids",
                    department_title: "Kids",
                    img: "elegant-clothes-kids.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Classic clothes kids",
                    department_title: "Kids",
                    img: "classic-clothes-kids.jpg",
                    inventory: 10,
                    views: 12
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
                    department_title: "Home",
                    img: "cookware.jpg",
                    inventory: 10,
                    views: 3
                },
                {
                    name: "Decoration",
                    department_title: "Home",
                    img: "decoration.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Furniture",
                    department_title: "Home",
                    img: "furniture.jpg",
                    inventory: 10,
                    views: 4
                },
                {
                    name: "Garden Tools",
                    department_title: "Garden",
                    img: "garden-tools.jpg",
                    inventory: 10,
                    views: 5
                },
                {
                    name: "Garden Equipments",
                    department_title: "Garden",
                    img: "garden-equipments.jpg",
                    inventory: 10,
                    views: 23
                },
                {
                    name: "Powers and Hand Tools",
                    department_title: "Garden",
                    img: "powers-hand-tools.jpg",
                    inventory: 10,
                    views: 3
                },
                {
                    name: "Utensil and Gadget",
                    department_title: "Garden",
                    img: "utensil-gadget.jpg",
                    inventory: 10,
                    views: 45
                },
                {
                    name: "Kitchen Equipments",
                    department_title: "Kitchen",
                    img: "kitchen-equipments.jpg",
                    inventory: 10,
                    views: 23
                },
                {
                    name: "Kitchen Utensil",
                    department_title: "Kitchen",
                    img: "kitchen-utensil.jpg",
                    inventory: 10,
                    views: 45
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
                    department_title: "Health",
                    img: "yoga-Instrument.jpg",
                    inventory: 10,
                    views: 34
                },
                {
                    name: "Passive Gymnastics",
                    department_title: "Health",
                    img: "passive-gymnastics.jpg",
                    inventory: 10,
                    views: 34
                },
                {
                    name: "Gym Equipment",
                    department_title: "Health",
                    img: "gym-equipment.jpg",
                    inventory: 10,
                    views: 21
                },
                {
                    name: "Hair Care",
                    department_title: "Beauty",
                    img: "hair-care.jpg",
                    inventory: 10,
                    views: 42
                },
                {
                    name: "Makeup",
                    department_title: "Beauty",
                    img: "makeup.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Perfume",
                    department_title: "Beauty",
                    img: "perfume.jpg",
                    inventory: 10,
                    views: 2
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
                    department_title: "Jewelry",
                    img: "necklace.jpg",
                    inventory: 10,
                    views: 34
                },
                {
                    name: "Pendant",
                    department_title: "Jewelry",
                    img: "pendant.jpg",
                    inventory: 10,
                    views: 34
                },
                {
                    name: "Ring",
                    department_title: "Jewelry",
                    img: "ring.jpg",
                    inventory: 10,
                    views: 21
                },
                {
                    name: "Sport Watch",
                    department_title: "Watches",
                    img: "sport-watch.jpg",
                    inventory: 10,
                    views: 42
                },
                {
                    name: "Womens Watch",
                    department_title: "Watches",
                    img: "womens-watch.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Mens Watch",
                    department_title: "Watches",
                    img: "mens-watch.jpg",
                    inventory: 10,
                    views: 2
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
                    department_title: "Technology",
                    img: "smartphones.jpg",
                    inventory: 10,
                    views: 34
                },
                {
                    name: "Tablets",
                    department_title: "Technology",
                    img: "tablets.jpg",
                    inventory: 10,
                    views: 21
                },
                {
                    name: "Wireless Speaker",
                    department_title: "Technology",
                    img: "wireless-speaker.jpg",
                    inventory: 10,
                    views: 42
                },
                {
                    name: "Desktop PC",
                    department_title: "Computer",
                    img: "desktop-pc.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Laptop",
                    department_title: "Computer",
                    img: "laptop.jpg",
                    inventory: 10,
                    views: 2
                },
                {
                    name: "Audio and Video",
                    department_title: "Computer",
                    img: "audio-video.jpg",
                    inventory: 10,
                    views: 34
                }
            ]
        }
    ]
}