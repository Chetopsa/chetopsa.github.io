import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


// Image component
const Image = ({ path, size, radius }) => {
  return <StyledImage src={path} alt="Image" size={size} radius={radius} />;
};

Image.propTypes = {
  path: PropTypes.string.isRequired, // Path is required
  size: PropTypes.string,
  radius: PropTypes.string,
};

const StyledImage = styled.img`
  width: ${(props) => props.size || "100%"}; /* Default size is 100% */
  height: ${(props) => props.size || "100%"}; /* Default size is 100% */
  object-fit: cover; /* Ensures the image fits nicely */
  border-radius: ${(props) => props.radius || ""}; /* Default radius is 8px */
`;

export default Image;