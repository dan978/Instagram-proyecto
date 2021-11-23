
const SearchPhoto = (props) => {
const {setInputValue, inputValue} = props


  return (
    <form className="searchPhoto">
      <input className="search"
        type="text"
        id="msginput"
        name="msginput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Busca una foto"
      ></input> 
    </form>
  );
};

export default SearchPhoto;

