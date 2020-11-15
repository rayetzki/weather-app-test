export const Input = ({
    setValue,
    placeholder
}) => (
    <input
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
    />
);