import { TiThSmallOutline } from "react-icons/ti";
import { MdFreeBreakfast } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { GiNoodles } from "react-icons/gi";
import { MdFoodBank } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { PiHamburgerFill } from "react-icons/pi";
const categories=[
    {
        id:1,
        name:"All",
        icon:<TiThSmallOutline className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
    {
        id:2,
        name:"Breakfast",
        icon:<MdFreeBreakfast className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
    {
        id:3,
        name:"Soups",
        icon:<LuSoup className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
    {
        id:4,
        name:"Pasta",
        icon:<GiNoodles className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
    {
        id:5,
        name:"Main_course",
        icon:<MdFoodBank className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px]  group-hover:text-white"/>
    },
    {
        id:6,
        name:"Pizza",
        icon:<GiFullPizza className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
    {
        id:7,
        name:"Burger",
        icon:<PiHamburgerFill className="h-[70px] w-[70px] text-green-500 group-hover:h-[80px] group-hover:w-[80px] group-hover:text-white"/>
    },
]


export default categories