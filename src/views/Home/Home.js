import React from "react";
import CardsBook from "../../components/CardsBook";
import SelectsFilters from "../../components/SelectsFilters";
import "./Home.scss";
import ButtonsSort from "../../components/ButtonsSort";

const Home = () => {
  return (
    <main className="container">
      <p className="text-uppercase font-weight-bold m-2 filter"> Фильтрация </p>
      <SelectsFilters />
      <p className="text-uppercase font-weight-bold m-2 filter"> Сортировка </p>
      <ButtonsSort />
      <div className="row row-cols-1 row-cols-md-3 pt-3">
        <CardsBook />
      </div>
    </main>
  );
}

export default Home;