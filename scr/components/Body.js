import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body = () => {
  const[listOfRestaurants, setListOfRestaurants]=useState([]);
  const[filtedrestaurant, setFiltedrestaurant]=useState([]);
  const[searchText, setSearchText]=useState("");

  useEffect(()=>{
    console.log('useeffect called');
    fetchData();
  },[]);
  const fetchData = async ()=>{
    const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    const restaurantsList=json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants

    setListOfRestaurants(restaurantsList);
    setFiltedrestaurant(restaurantsList)
  };

  console.log('boday called');
  const onlineStatus = useOnlineStatus();
  if(onlineStatus=== false)
  return(
<h1>Looks like you're offline!!! Please check your internet connection;</h1>)
  return listOfRestaurants.length ===0 ?(<Shimmer />):(
    <div className="body">
        <div className="filter flex">
      <div className=" m-4 p-4 search">
        <input type="text" className="border border-solid to-black " value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}></input>
        <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={()=>{
          const filtedrestaurant = listOfRestaurants.filter((restaurant) => restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()));
          setFiltedrestaurant(filtedrestaurant);
        }}>Search</button>
      </div>
    
     <div className="m-4 p-4 flex items-center">
     <button className="px-4 py-2 bg-gray-100 rounded-lg"
        onClick={()=>{
          const filteredList= listOfRestaurants.filter((restaurant) =>restaurant.info.avgRating >= 4.5);
          console.log(filteredList);
          setListOfRestaurants(filteredList);
          }}>Top Rated Restaurant</button>
     </div>
      </div>
      <div className="flex flex-wrap">
        {filtedrestaurant.map( (restaurant) =>(
       <Link to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id}><RestaurantCard  resdata={restaurant} /></Link> 
        ))}
      </div>
    </div>
  );
};
export default Body;