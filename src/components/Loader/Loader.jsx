import { bool } from "prop-types";
import "./Loader.module.css";

export const Loader = ({
    open
}) => (
    open && <div className="Loader"></div>
);

Loader.propTypes = {
    open: bool
};