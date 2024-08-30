<script lang="ts">
    import { fly } from "svelte/transition";

    export let fromPlayer: boolean;
    export let content: string;
</script>

<div class="container {fromPlayer ? "right" : ""}" transition:fly={{y: 20, duration: 300}}>
    <div class="message {fromPlayer ? "green" : ""}">
        <p>{@html content}</p>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

    .right {
        justify-content: end;
    }

    .container {
        display: flex;
        height: max-content;
        width: 100%;
        padding: 0 2rem;
        margin-top: 1rem;
        box-sizing: border-box;
    }

    .message {
        height: max-content;
        background-color: #282B30;
        border-radius: 50px;
        padding: 0.5rem 2rem;
        max-width: 40%;
    }

    .green {
        background-color: #128C7E;
    }

    .message p {
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 17px;
        color: #F5F5F5;
        margin: 0;
        word-break: break-word;
    }
</style>
