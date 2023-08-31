import React, { useState } from "react";
import { MoreVert, ModeEdit, Delete } from "@mui/icons-material";

import IconButton from "../../shared/buttons/IconButton";
import AddEditColumn from "../../shared/AddEditColumn";
import FlatButton from "../../shared/buttons/FlatButton";

const ColHeader = ({ column, category, dispatch, columnIndex }) => {
  const [columnName, setColumnName] = useState("");

  return (
    <div className="w-full relative inline-block text-left">
      <div
        className={`flex relative max-h-[40px] items-center justify-between text-white text-lg rounded-md p-2 uppercase my-3`}
        style={{ backgroundColor: category.color.primary }}
      >
        {column.title}
        <IconButton
          Icon={MoreVert}
          onClick={() => {
            dispatch({
              type: "showMenu",
              payload: { showMenu: !column.showMenu, columnIndex, column },
            });
          }}
          color="white"
        />
      </div>
      {column.showMenu ? (
        <div
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white 
          shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="flex flex-col w-full p-1 gap-2 " role="none">
            <AddEditColumn
              dispatch={dispatch}
              column={column}
              category={category}
              Icon={ModeEdit}
              fontSize="medium"
              text="Modifier"
              color={category?.color?.primary}
              setColumnName={setColumnName}
              columnName={columnName}
              placeholder="Edit column title"
              onClick={() => {
                dispatch({
                  type: "updateStatus",
                  payload: { todos: column.todos, title: columnName },
                });
                dispatch({
                  type: "updateColumnName",
                  payload: {
                    id: column.id,
                    title: columnName || column.title,
                  },
                });

                dispatch({
                  type: "showMenu",
                  payload: { showMenu: !column.showMenu, columnIndex, column },
                });
              }}
            />

            <FlatButton
              Icon={Delete}
              text="Suprimer"
              color="red"
              onClick={() => {
                dispatch({
                  type: "deleteColumn",
                  payload: { column },
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ColHeader;
