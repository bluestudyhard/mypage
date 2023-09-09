import type { Ref } from 'vue'

export async function importImages(imgNum: number, imgLists: Ref<string[]>) {
  for (let i = 1; i <= imgNum; i++) {
    const imgPath = await import(`@/assets/images/page${i}.webp`)
    imgLists.value.push(imgPath.default)
  }
  return imgLists
}
