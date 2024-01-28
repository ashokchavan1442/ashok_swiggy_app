import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const  RestaurantMenu = () => {
  const {resId}=useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex,setShowIndex] = useState(null);

 if(resInfo === null) return <Shimmer />;

 const{name,cuisines} = resInfo?.cards[0]?.card?.card?.info;
 const{itemCards}  = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
 
const categories =  resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")


return (
      <div className="text-center">
        <h1 className="font-bold my-10 text-2xl">{name}</h1>
        <p className="font-bold  text-lg">{cuisines.join(', ')}</p>
        <h2>Menu</h2>
        <ul>
          {itemCards.map((item) => (
            <li key={item.card.info.id}>{item.card.info.name}-Rs.{item.card.info.price/100 || item.card.info.defaultPrice /100}</li>
          ))}
        </ul>
        {/* categories accordions */}
        {categories.map( (category,index)=>(
          <RestaurantCategory key={category?.card?.card.title} 
          data ={category?.card?.card}
           showItems={index === showIndex? true:false} setShowIndex={() => setShowIndex(index)}/>
        ))};
        
      </div>
  )
}
export default RestaurantMenu;