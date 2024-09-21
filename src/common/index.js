import { reactive } from "vue";
export const checkTab = () => {

}

export const login = () => {
    const user = reactive({
        username: "",
        password: "",
        check: false
    });
    return user;
}

export const onCheckbox = () => {

}