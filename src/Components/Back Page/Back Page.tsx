
import { useNavigate } from "react-router-dom"






const BackPage = () => {
    const navigate = useNavigate()

    return <button >
        <svg
            onClick={() => navigate(-1)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
    </button>
}

export {
    BackPage
}