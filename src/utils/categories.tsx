import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice, GiDress, GiLipstick } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import {FaFish} from "react-icons/fa";

export const Categories = [
    {
        id: 1,
        name: "Chicken",
        urlParam: 'chicken',
        icon: <GiChickenOven />,
    },
    {
        id: 2,
        name: "Fruits",
        urlParam: 'fruits',
        icon: <GiFruitTree />,
    },
    {
        id: 3,
        name: "Beverages",
        urlParam: 'beverages',
        icon: <GiBeerBottle />,
    },
    {
        id: 4,
        name: "Icecreams",
        urlParam: 'icecreams',
        icon: <MdOutlineIcecream />,
    },
    {
        id: 5,
        name: "Apparel",
        urlParam: 'dress',
        icon: <GiDress />,
    },
    {
        id: 6,
        name: "Cosmetics",
        urlParam: 'cosmetics',
        icon: <GiLipstick/>,
    },
   
]