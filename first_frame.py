import cv2

def extract_first_frame(video_path, output_path="first_frame.png"):
    """
    Extract the first frame from a video file and save it as an image.
    
    Args:
        video_path (str): Path to the video file
        output_path (str): Path where the first frame will be saved
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        cap = cv2.VideoCapture(video_path)
        
        if not cap.isOpened():
            print("Error: Could not open video file")
            return False
        
        ret, frame = cap.read()
        
        if ret:
            cv2.imwrite(output_path, frame)
            print(f"First frame saved to {output_path}")
            cap.release()
            return True
        else:
            print("Error: Could not read frame from video")
            cap.release()
            return False
            
    except Exception as e:
        print(f"Error: {e}")
        return False


if __name__ == "__main__":
    # Example usage
    video_file = "project_teasers/adaptmani/adaptManip.mp4"  # Replace with your video path
    extract_first_frame(video_file)