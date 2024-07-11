import React from "react";
import CitySearch from "../../atoms/CitySearch";
import styles from './Home.module.css'; 


const Home = () => {
  return (
    <>
      <h1 className={styles["title"]}>Find Nearest Cities</h1>
      <CitySearch />
    </>
  );
};

export default Home;
