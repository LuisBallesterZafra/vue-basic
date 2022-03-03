import { list as listService, get as getService } from './mock/towns'

export async function listTowns() {
	return await listService()
}

export async function getTown(town) {
	return await getService(town)
}
