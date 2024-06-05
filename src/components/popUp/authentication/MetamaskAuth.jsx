import { useContext, useState, useEffect, createContext, ReactNode, useMemo } from "react"

export function useMetamask(){
    return useContext({
        isMetamaskInstalled: true,
  isMetamaskLoading: true,
  isMetamaskConnected: true,
    })

    
}