import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItems";

const Place = styled.div`
  text-align: center;
  img {
    border-radius: 5px;
    mmargin-bottom: 20px;
  }
`;

const MenuList = ({ place, shoppingCart, onOrder }) => {
  return (
    <>
      <Place>
        <img src={place.image} width={100} height={100} alt="Menu" />
        <h3>
          <b>{place.name}</b>
        </h3>
      </Place>
      {place?.categories
        ?.filter(
          (category) =>
            category.menu_items.filter((item) => item.is_available).length
        )
        .map((category) => (
          <div key={category.id} className="mt-5">
            <h4 className="mb-4">
              <b>{category.name}</b>
            </h4>
            {category.menu_items
              .filter((item) => item.is_available)
              .map((item) => (
                <MenuItem
                  key={item.id}
                  item={{
                    ...item,
                    quantity: shoppingCart[item.id]?.quantity,
                  }}
                  onOrder={onOrder}
                  shoppingCart={shoppingCart}
                />
              ))}
          </div>
        ))}
    </>
  );
};

export default MenuList;
