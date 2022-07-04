import { Image } from '../models'
import { ImageInput, ImageOutput } from '../models/Image'

export const create = async(payload: ImageInput): Promise<ImageOutput> => {
    const image = await Image.create(payload)
    if (!image){
        throw new Error('could not create')
    }
    const createdUser: ImageOutput = {
        name: image.name!,
        hyperlink: image.hyperlink!,
        composes: image.composes!
    }
    return createdUser
}

export const update = async(id: string, payload: Partial<ImageInput>): Promise<ImageOutput> => {
    const image = await Image.findById(id)
    if (!image) {
        throw new Error('not found')
    }
    const updatedImage = await Image.findByIdAndUpdate(id, payload)
    if (!updatedImage) {
        throw new Error('could not update')
    }
    return updatedImage
}

export const getById = async(id: string): Promise<ImageOutput> => {
    const image = await Image.findById(id)
    if (!image) {
        throw new Error('not found')
    }
    return image
}

export const getByImageName = async(imageName: string): Promise<ImageOutput> => {
    const image = await Image.findOne({
        name: /imageName/i
        
    })
    if (!image) {
        throw new Error('not found')
    }
    return image
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletedImageBool = await Image.findByIdAndDelete(id)
    return !!deletedImageBool
}