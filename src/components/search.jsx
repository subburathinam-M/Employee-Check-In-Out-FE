import React from 'react';
import styled from 'styled-components';

const Search = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <StyledWrapper>
      <form className="form">
        <button type="button" aria-label="search">
          <svg
            width={17}
            height={16}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          className="input"
          placeholder={placeholder}
          required
          type="text"
          value={value}      // ✅ Controlled input
          onChange={onChange} // ✅ Controlled input
        />
       <button 
  className="reset" 
  type="button"  // FIXED: not type="reset"
  onClick={() => onChange({ target: { value: '' } })}  // FIXED: clear via React state
>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form button {
    border: none;
    background: none;
    color: #8b8ba7;
  }

  .form {
    --timing: 0.3s;
    --width-of-input: 200px;
    --height-of-input: 40px;
    --border-height: 2px;
    --input-bg: #fff;
    --border-color: #2f2ee9;
    --border-radius: 30px;
    --after-border-radius: 1px;
    position: relative;
    width: var(--width-of-input);
    height: var(--height-of-input);
    display: flex;
    align-items: center;
    padding-inline: 0.8em;
    border-radius: var(--border-radius);
    transition: border-radius 0.5s ease;
    background: var(--input-bg, #fff);
  }

  .input {
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    height: 100%;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
  }

  .form:before {
    content: "";
    position: absolute;
    background: var(--border-color);
    transform: scaleX(0);
    transform-origin: center;
    width: 100%;
    height: var(--border-height);
    left: 0;
    bottom: 0;
    border-radius: 1px;
    transition: transform var(--timing) ease;
  }

  .form:focus-within {
    border-radius: var(--after-border-radius);
  }

  input:focus {
    outline: none;
  }

  .form:focus-within:before {
    transform: scale(1);
  }

  .reset {
    border: none;
    background: none;
    opacity: 0;
    visibility: hidden;
  }

  input:not(:placeholder-shown) ~ .reset {
    opacity: 1;
    visibility: visible;
  }

  .form svg {
    width: 17px;
    margin-top: 3px;
  }
`;

export default Search;
