import React, { useState } from "react";

const InputSubmit = ({ defaultValue = "", onSubmit, onCancel = null }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleSubmit = () => {
    if (!!inputValue && defaultValue !== inputValue) {
      onSubmit(inputValue);
      setInputValue("");
      return;
    }
    onCancel && onCancel();
  };

  const handleCancel = () => {
    setInputValue("");
    onCancel && onCancel();
  };

  return (
    <div>
      <input
        type="text"
        id="input"
        name="input"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <input type="button" value="Submit" onClick={handleSubmit} />
      <input type="button" value="Cancel" onClick={handleCancel} />
    </div>
  );
};

export default InputSubmit;
