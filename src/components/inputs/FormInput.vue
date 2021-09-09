<template>
    <div :class="[ 'form-group', !!error && 'has-error' ]">
        <label class="form-label" for="email">{{label}}</label>
        <div class="input-group has-validation">
            <input
                :id="name"
                :name="name"
                :type="type"
                :value="value"
                @input="$emit('update:value', $event.target.value)"
                :class="'form-control form-control-sm'  + (!!error ? ' is-invalid' : ' is-valid')"
                aria-describedby="validationServerFeedback"
                @blur="$emit('validate')"
                @keypress="$emit('validate')"
            />
            <div id="validationServerFeedback" class="invalid-feedback" v-if="!!error">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "form-input",
    props: {
        type: { required: true },
        label: { required: true },
        name: { required: true },
        value: { required: true },
        error: { required: true }
    },
    emits: ['update:value'],
};
</script>