package variantdto

type VariantResponse struct {
	ID                 int `json:"id"`
	Name               string `json:"name"`
	SubscribePeriodDay int    `json:"subs_period"`
	Price              int    `json:"price"`
	Desc               string `json:"desc"`
}
