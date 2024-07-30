export const isVideoFile = (url: string) => {
  const ext = url.split('.').pop()
  switch (ext?.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      return true
  }
  return false
}