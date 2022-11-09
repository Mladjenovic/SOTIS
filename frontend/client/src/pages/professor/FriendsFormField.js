"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useFriendsFormField_1 = require("./useFriendsFormField");
var FriendsFormField = function () {
    var _a = (0, useFriendsFormField_1["default"])(), fields = _a.fields, register = _a.register, addNewFriend = _a.addNewFriend, removeFriend = _a.removeFriend;
    return (<div>
      <div>
        <input {...register("name")} placeholder="Name"/>
        <button type="button" onClick={addNewFriend}>
          + Add friend
        </button>
      </div>
      {fields.map(function (field, index) { return (<div key={field.id}>
          <button type="button" onClick={removeFriend(index)}>
            -
          </button>
          <input {...register("friends.".concat(index, ".name"))} placeholder="Name"/>
        </div>); })}
    </div>);
};
exports["default"] = FriendsFormField;
