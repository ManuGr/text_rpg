<script lang="ts">
    import { gameState, move } from "$lib/GameStateStore";
    import { onMount } from "svelte";

	import Input from "../components/Input.svelte";
	import Message from "../components/Message.svelte";

    const directions = ["north", "east", "south", "west"];

    let currentLocation: string;
    let feedbackMessage: string;
    let description: string;

    $: {
        gameState.subscribe(state => {
            currentLocation = state.currentLocation;
            feedbackMessage = state.feedbackMessage;
            description = state.locations[currentLocation].description;
        });
    }

    interface Message {
        fromPlayer: boolean;
        content: string;
    }

    let playerInput: any;

    let messages: Message[] = [];
    let disableInput = false;

    function addMessage(event: any) {
        const newMessage: Message = {
            fromPlayer: true,
            content: event.detail,
        }
        messages = [...messages, newMessage];
        disableInput = true;
        setTimeout(function () {
            computerMessage(event.detail);
        }, 1000);
    }

    function computerMessage(command: string) {
        const words = command.split(" ");
        let newMessage: Message;
        if((words[0].toLowerCase() === "move" || words[0].toLowerCase() === "go") &&  directions.includes(words[1].toLowerCase())) {
            move(words[1].toLowerCase());
            newMessage = {
                fromPlayer: false,
                content: `${feedbackMessage}<br><br>Location: ${currentLocation.toUpperCase()}<br><br>${description}`
            };
        } else {
            newMessage = {
                fromPlayer: false,
                content: "That is not a valid command. Please try again."
            };
        }
        messages = [...messages, newMessage];
        setTimeout(() => {disableInput = false}, 300);
        playerInput.setFocus();
    }

    onMount(() => {
        let newMessage: Message = {
            fromPlayer: false,
            content: `Location: ${currentLocation.toUpperCase()}<br><br>${description}`
        };
        messages = [...messages, newMessage];
        playerInput.setFocus();
    })

</script>

<div id="page">
    {#each messages as message (message)}
        <Message fromPlayer={message.fromPlayer} content={message.content} />
    {/each}
    <Input bind:this={playerInput} on:enter={addMessage} {disableInput} />
</div>

<style>
#page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
}
</style>