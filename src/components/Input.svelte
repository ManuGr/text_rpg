<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let textArea;
    export let disableInput;
    let lastInput = "";
    let inputValue = "";
    let currentInput = "";

    function handleKeyDown(event) {
        if (event.key == "Enter") {
            dispatch("enter", inputValue);
            lastInput = inputValue;
            inputValue = "";
        }

        if (event.key == "ArrowUp" && lastInput !== "") {
            event.preventDefault();
            currentInput = inputValue;
            inputValue = lastInput;
        }

        if (event.key == "ArrowDown" && inputValue === lastInput) {
            inputValue = currentInput;
        }
    }
</script>

<input type="text" bind:this={textArea} bind:value={inputValue} on:keydown={handleKeyDown} placeholder="Type your message and press Enter" disabled={disableInput}>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

    input {
        box-sizing: border-box;
        border-radius: 50px;
        background-color: #282B30;
        color: #F5F5F5;
        width: calc(100% - 5rem);
        margin: 1rem 5rem;
        padding: 0.5rem 1rem;
        border: solid #1E2124 1px;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
        transition: opacity 0.3s linear 0.1s;
    }

    input:focus {
        outline: none !important;
        border: solid #1B1212 1px;
        box-shadow: 0 0 10px #424549;
    }

    input:disabled {
        opacity: 15%;
    }
</style>