import React from 'react'
import NavbarComponent from '../components/parts/NavbarComponent'
import AddVariantComponent from '../components/admin/AddVariantComponent'
import VariantsComponent from '../components/user/VariantsComponent'

export default function AddVariantPage() {
    return (
        <div>
            <NavbarComponent />
            <AddVariantComponent />
            <VariantsComponent />
        </div>
    )
}
