import makeFactoryClass from '../class_factory'
import BaseClass from './base_class'
import { getToken } from '~/helper/jwt'

const accessToken = getToken()

class SyntheticMock extends BaseClass { }
class Synthetic extends BaseClass {
    getGeneralDataChart() {
        return this.$axios.$get(
            '/api/get_general_data_chart',
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
    }

    getLeaveCompanyReasonChart(year) {
        return this.$axios.$get(
            `/api/get_leave_company_reason_chart?year=${year}`,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
    }

    getPaidLeaveReasonChart(year, employeeId) {
        return this.$axios.$get(
            `api/get_paid_leave_reason_chart?year=${year}&employeeId=${employeeId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            }
        )
    }


}

export default makeFactoryClass(SyntheticMock, Synthetic)