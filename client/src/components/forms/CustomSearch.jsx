import { AutoComplete, Input } from 'antd';
import PropTypes from 'prop-types'


const CustomSearch = ({ handleSearch, onSelect, options, placeholder, style = {} }) => {

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      style={style}
    >
      <Input.Search placeholder={placeholder ? placeholder : 'Search Something...'} enterButton />
    </AutoComplete>
  );
};

CustomSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  style: PropTypes.object
}
export default CustomSearch;
