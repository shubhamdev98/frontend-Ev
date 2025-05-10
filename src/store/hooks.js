import { useDispatch, useSelector } from "react-redux"
import { store } from "./store"

// Custom hook to access dispatch
export const useAppDispatch = () => useDispatch()

// Custom hook to access selector
export const useAppSelector = useSelector

// Optional: Export RootState if needed somewhere
export const getRootState = () => store.getState()
