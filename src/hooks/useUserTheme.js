import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const useUserTheme = () => {
    const { user } = useSelector(state => state.user)
    const [theme] = useState("light")
    const userTheme = useMemo(() => {
        const currentTheme = user?.theme ? user.theme : theme
        return currentTheme
    }, [theme])
    return userTheme
}

export default useUserTheme