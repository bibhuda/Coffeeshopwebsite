export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  roast: string;
  image: string;
  rating: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    price: 22.50,
    weight: "250g",
    description: "A luminous coffee from the birthplace of arabica. Grown at elevations above 1,900 meters in the Yirgacheffe region, this lot showcases the terroir's extraordinary complexity. Hand-picked and naturally processed, it delivers a cup that is both delicate and vibrant.",
    notes: ["Blueberry", "Jasmine", "Bergamot", "Honey"],
    roast: "Light",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8455e?w=600&h=600&fit=crop",
    rating: 4.9,
    inStock: true
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    price: 19.00,
    weight: "250g",
    description: "Sourced from the misty highlands of Huila, Colombia's premier growing region. This Supremo grade coffee is carefully washed and sun-dried, producing a remarkably clean cup with balanced sweetness and a silky body that lingers on the palate.",
    notes: ["Caramel", "Red Apple", "Milk Chocolate", "Walnut"],
    roast: "Medium",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&h=600&fit=crop",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    name: "Midnight Velvet Blend",
    origin: "Brazil & Indonesia",
    category: "Blend",
    price: 18.50,
    weight: "250g",
    description: "Our signature dark roast blend combines the chocolatey depth of Brazilian Santos with the earthy complexity of Sumatran Mandheling. Slow-roasted to develop rich, smoky undertones while maintaining a smooth, full-bodied character perfect for espresso.",
    notes: ["Dark Chocolate", "Smoked Oak", "Brown Sugar", "Tobacco"],
    roast: "Dark",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=600&h=600&fit=crop",
    rating: 4.8,
    inStock: true
  },
  {
    id: 4,
    name: "Kenyan AA Peaberry",
    origin: "Kenya",
    category: "Single Origin",
    price: 26.00,
    weight: "200g",
    description: "An exceptional peaberry selection from Kenya's central highlands. These rare single-bean cherries produce an intensely concentrated flavor profile. Double-washed and fermented for 72 hours, resulting in a cup of extraordinary clarity and brightness.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Raw Sugar"],
    roast: "Light-Medium",
    image: "https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=600&h=600&fit=crop",
    rating: 4.6,
    inStock: true
  },
  {
    id: 5,
    name: "Morning Ritual Blend",
    origin: "Central America",
    category: "Blend",
    price: 16.50,
    weight: "300g",
    description: "Crafted for your daily ritual, this blend harmonizes beans from Guatemala, Costa Rica, and Panama. Medium-roasted to bring out natural sweetness while preserving the bright acidity that makes mornings worth waking up for. Consistent, reliable, and endlessly enjoyable.",
    notes: ["Hazelnut", "Vanilla", "Orange Zest", "Toffee"],
    roast: "Medium",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=600&fit=crop",
    rating: 4.5,
    inStock: true
  },
  {
    id: 6,
    name: "Decaf Twilight",
    origin: "Mexico",
    category: "Decaf",
    price: 20.00,
    weight: "250g",
    description: "Swiss Water Process decaffeination preserves the full character of this Mexican highland coffee. Enjoy the rich, comforting flavors of a well-crafted cup without the caffeine. Perfect for evenings when you crave the ritual without the stimulation.",
    notes: ["Cocoa", "Cinnamon", "Dried Fig", "Maple"],
    roast: "Medium-Dark",
    image: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=600&h=600&fit=crop",
    rating: 4.4,
    inStock: true
  }
];

export const categories = ["All", "Single Origin", "Blend", "Decaf"];
