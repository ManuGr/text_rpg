<script lang="ts">
	import Input from "../components/Input.svelte";
	import Message from "../components/Message.svelte";

    let messages: string[] = [];

    function addMessage(event) {
        messages = [...messages, event.detail];
    }

</script>

<div id="page">
    {#each messages as message (message)}
        <Message fromPlayer={true} content={message} />
    {/each}
    <Input on:enter={addMessage} />
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