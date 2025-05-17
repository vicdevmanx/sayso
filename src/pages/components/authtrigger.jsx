// components/ModalTrigger.jsx
"use client"

import { useState, useEffect } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer"



export default function ModalTrigger({ triggerText = "Open", children }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [open, setOpen] = useState(false)

  // Handle browser back button
  useEffect(() => {
    if (open) {
      window.history.pushState({ modal: true }, "")
      const handlePopState = (e) => {
        if (e.state?.modal) {
          setOpen(false)
        }
      }
      window.addEventListener("popstate", handlePopState)
      return () => {
        window.removeEventListener("popstate", handlePopState)
        if (window.history.state?.modal) {
          window.history.back()
        }
      }
    }
  }, [open])

  const button = (
    <button className="bg-[#272b34] text-white px-4 py-2 rounded hover:bg-[#303640] transition">
      {triggerText}
    </button>
  )

  const contentClasses = "bg-[#1c1f26] text-white rounded-md transition-all duration-300"

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent className={contentClasses}>
        {children}
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent
        className="
          sm:max-w-md 
          bg-[#1c1f26] 
          text-white 
          rounded-md 
          transition-transform 
          duration-300 
          ease-out
          data-[state=open]:opacity-100
          data-[state=open]:scale-100
          data-[state=closed]:opacity-0
          data-[state=closed]:scale-95
        "
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
