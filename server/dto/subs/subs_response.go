package authdto

type SubscribeResponse struct {
	IdCompany   int `json:"company_id"`
	CompanyName string `json:"company_name"`
	IdUser      int `json:"user_id"`
	IdVariant   int `json:"variant_id"`
	Status string `json:"status"`
}
