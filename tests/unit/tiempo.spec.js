import { shallowMount } from '@vue/test-utils'
import PieDePagina from "../../src/components/Inicio/recomendacion-semanal.vue"

describe("recomendacion-semanal.vue", () => {
    it("el nombre es correcto", () => {
        const wrapper = shallowMount(PieDePagina, {
            propsData: {}
        });
        expect(wrapper.created).not.toBeUndefined();
    });
});
