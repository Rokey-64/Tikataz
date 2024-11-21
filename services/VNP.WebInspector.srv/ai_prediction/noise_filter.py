import math


def noise_filter(predicted_result: dict, without_this:list)->dict:
    """
        This function is used to filter noise from the redicting result of the AI.
    """
    
    noise_handle_Res = {}
    if not predicted_result:
        return noise_handle_Res
    
    sum_value:int = 0
    lenght = len(predicted_result)
    if lenght == 0:
        return noise_handle_Res

    #
    for key, value in predicted_result.items():
        sum_value += value

    expection = math.ceil(math.sqrt(sum_value/lenght))

    for key, value in predicted_result.items():
        if value > expection or key in without_this:
            noise_handle_Res[key] = value

    return noise_handle_Res