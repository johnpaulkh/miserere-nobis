import {Button} from "react-bootstrap";

type AddButtonProps = {
    onClick: () => void;
}

export default function AddButton({onClick} : AddButtonProps) {
    return (
        <Button
            variant="success"
            className="rounded-circle"
            style={{ position: "fixed", bottom: "24px", right: "24px" }}
            onClick={onClick}
        >
            +
        </Button>
    )
}