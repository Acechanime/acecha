import { shallowMount } from '@vue/test-utils'
import episodios from "@/components/Inicio/episodios.vue"

describe("episodios.vue", () => {
    it("Muestra mensajes de error", () => {
        const wrapper = shallowMount(episodios);
        expect(wrapper.name()).toBe("episodios");
    });
});
