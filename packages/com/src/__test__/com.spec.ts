import { describe, expect, test, vi } from 'vitest'
import { downloadFile } from '../com'

describe('downloadFile', () => {
  test('should create an <a> element with the given URL and click it', () => {
    const url = 'https://example.com/file.txt'

    // Mock the createElement and click methods
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      href: 'a',
      click: vi.fn(),
    } as any)

    downloadFile(url)

    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(createElementSpy.mock.results[0].value.href).toBe(url)
    expect(createElementSpy.mock.results[0].value.click).toHaveBeenCalled()

    // Restore the original methods
    createElementSpy.mockRestore()
  })
})
