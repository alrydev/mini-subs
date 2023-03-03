import React, { } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import NavbarComponent from "../components/NavbarComponent";
import CompaniesComponent from "../components/CompaniesComponent";

function Transactions() {

    // get variants: 
    let { data: companies } = useQuery('companiesCache', async () => {
        const response = await API.get('/companies')
        return response.data.data
    })

    console.log("data companies, ", companies);

    return (
        <div className="bg-white">
            <NavbarComponent />
            <CompaniesComponent />
        </div>
    );
};

export default Transactions;
