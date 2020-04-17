import { IdMap } from "medusa-test-utils"
import { request } from "../../../../../helpers/test-request"
import { ProductServiceMock } from "../../../../../services/__mocks__/product"

describe("POST /admin/products/:id/options", () => {
  describe("successful add option", () => {
    let subject

    beforeAll(async () => {
      subject = await request(
        "POST",
        `/admin/products/${IdMap.getId("productWithOptions")}/options`,
        {
          payload: {
            optionTitle: "Test option",
          },
          adminSession: {
            jwt: {
              userId: IdMap.getId("admin_user"),
            },
          },
        }
      )
    })

    it("returns 200", () => {
      expect(subject.status).toEqual(200)
    })

    it("calls service addOption", () => {
      expect(ProductServiceMock.addOption).toHaveBeenCalledTimes(1)
      expect(ProductServiceMock.addOption).toHaveBeenCalledWith(
        IdMap.getId("productWithOptions"),
        "Test option"
      )
    })

    it("returns the updated product decorated", () => {
      expect(subject.body._id).toEqual(IdMap.getId("productWithOptions"))
      expect(subject.body.decorated).toEqual(true)
    })
  })
})