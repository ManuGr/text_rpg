<script lang="ts">
	import Input from "../components/Input.svelte";
	import Message from "../components/Message.svelte";

    interface Message {
        fromPlayer: boolean;
        content: string;
    }

    let messages: Message[] = [];
    let disableInput = false;

    function addMessage(event) {
        const newMessage: Message = {
            fromPlayer: true,
            content: event.detail,
        }
        messages = [...messages, newMessage];
        disableInput = true;
        setTimeout(computerMessage, 1000);
    }

    function computerMessage() {
        const newMessage: Message = {
            fromPlayer: false,
            content: "Hello adventurer! Welcome to <Universe Name>!",
        }
        messages = [...messages, newMessage];
        setTimeout(() => {disableInput = false}, 300);
    }

</script>

<div id="page">
    {#each messages as message (message)}
        <Message fromPlayer={message.fromPlayer} content={message.content} />
    {/each}
    <Input on:enter={addMessage} {disableInput} />
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