const ImagesField = ({ record }) => (
  <ul>
    {record.images.map((item) => (
      <img
        src={item}
        title="An Image"
        alt=""
        style={{ margin: "0.5rem", maxHeight: "10rem" }}
      />
    ))}
  </ul>
);
ImagesField.defaultProps = {
  addLabel: true,
};

export default ImagesField;
